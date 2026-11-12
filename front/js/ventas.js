const state = { page: 1, pageSize: 10, query: "", sortKey: "cliente.nombre", direction: 1 };
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});
const body = document.querySelector("#table-body");

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getSortValue(venta, key) {
  return key.split(".").reduce((value, part) => value?.[part], venta);
}

function getFilteredVentas() {
  const terms = normalize(state.query).trim().split(/\s+/).filter(Boolean);
  return ventasBD.data.filter(venta => {
    const text = normalize([
      venta.cliente.nombre,
      venta.fechaVenta,
      venta.estado,
      venta.total,
      currency.format(venta.total)
    ].join(" "));
    return terms.every(term => text.includes(term));
  }).sort((a, b) => {
    const valueA = getSortValue(a, state.sortKey);
    const valueB = getSortValue(b, state.sortKey);
    const comparison = typeof valueA === "number" && typeof valueB === "number"
      ? valueA - valueB
      : String(valueA ?? "").localeCompare(String(valueB ?? ""), "es", {
          sensitivity: "base",
          numeric: true
        });
    return comparison * state.direction;
  });
}

function render() {
  const filtered = getFilteredVentas();
  const start = (state.page - 1) * state.pageSize;
  const visible = filtered.slice(start, start + state.pageSize);
  body.replaceChildren();

  visible.forEach(venta => {
    const row = document.createElement("tr");
    [
      venta.cliente.nombre,
      venta.fechaVenta,
      venta.estado,
      currency.format(venta.total)
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    body.append(row);
  });
}
render();