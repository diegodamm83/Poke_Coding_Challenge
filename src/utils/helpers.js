export function sortData(data, sort) {
  if (sort === 'name') { // Si la orden es name, ordenamos alfabeticamente de A-Z
    return data.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === '-name') { // Si la orden es -name, ordenamos alfabeticamente de A-Z
    return data.slice().sort((a, b) => b.name.localeCompare(a.name));
  } else {
    // Predeterminado, no ordenar
    return data;
  }
}


export function filterData(data, filter) {
 // Buscamos un valor de filtro
 if (!filter) {
  return data; 
}

// Retornamos valores que coincidan con el filtro
return data.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
}