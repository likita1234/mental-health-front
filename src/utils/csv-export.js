export const exportCSV = (title, data) => {
  // Convert data to CSV format
  let csvContent = 'data:text/csv;charset=utf-8,'

  // Add title row
  csvContent += title.join(',') + '\n'

  // Add data rows
  for (let i = 0; i < data[0].length; i++) {
    const row = data.map((column) => column[i])
    csvContent += row.join(',') + '\n'
  }

  // Create a download link
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'Data.csv')
  document.body.appendChild(link)

  // Trigger the download
  link.click()
}
