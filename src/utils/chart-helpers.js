import { Color } from '@/constants'

const getAllColors = () => {
  return [
    { name: 'Red', value: Color.RED },
    { name: 'Amber', value: Color.AMBER },
    { name: 'Green', value: Color.GREEN },
    { name: 'blue', value: Color.BLUE }
  ]
}

const colors = getAllColors()

const applyColorsToColumns = (index) => {
  // get index among colors length
  const colorIndex = index % colors?.length
  return colors[colorIndex]?.value
}

const getPieChartColorSets = (colorsCount, documentStyle) => {
  let colors = []
  for (let i = 0; i < colorsCount; i++) {
    colors.push(documentStyle.getPropertyValue(applyColorsToColumns(i)))
  }
  return colors
}

//For applying customColor in chart
const customColors = (data, documentStyle) => {
  return data?.map((obj) => {
    const color = obj?.values?.map((val) => {
      return documentStyle.getPropertyValue(val?.bgcolor)
    })
    return color[0]
  })
}

export const getBarChartDatasets = (data, documentStyle, tension = false, customizeInnerColor) => {
  if (data) {
    // Format the data
    // first column data is present in the outer row of each object while the rest data resides inside values object
    /**
     * labels: ["Group A", "Group B", ...] :- length of array inside data === labels count
     *
     * Metric Data Format                       Required Format for datasets
     * [                                        [
     *   {                                         {
     *     "label": "Group A",                       label: "Group A",
     *                                               backgroundColor : ....,
     *     "values": [                               borderColor : ....,
     *       {                                       data : [numeric_data, numeric_data],
     *         "label": "Data A",                  },               {
     *         "value": "numeric_data"               label: "Group B",
     *       },                                      backgroundColor : ....,
     *       {                                       borderColor : ....,
     *         "label": "Data B",                    data : [numeric_data, numeric_data],                     },
     *         "value": "numeric_data"             ..
     *       },                                    ..
     *       {                                     ..
     *         "label": "Data C",               ]
     *         "value": "numeric_data"
     *       },
     *       ..
     *     ]
     *   },
     *   ..
     * ]
     */
    // Intially, make normal array of values only
    const chartValues = data?.map((item) => item.values)
    // extract first row and get all the possible different data available using each labels and bgcolor inside values
    const dataTypes = data[0]?.values?.map((obj) => {
      return { label: obj.label, bgcolor: obj?.bgcolor }
    })

    // create an array to store every datasets we will be creating for each type in dataTypes
    let chartData = []

    debugger
    // Now using dataTypes, we can filter out and align all the datasets collections in each sets using dataTypes
    dataTypes?.forEach((dataType, index) => {
      const newData = {
        label: dataType.label,
        backgroundColor: customizeInnerColor
          ? customColors(data, documentStyle)
          : documentStyle.getPropertyValue(
              dataType.bgcolor ? dataType.bgcolor : applyColorsToColumns(index)
            ),
        borderColor: customizeInnerColor
          ? customColors(data, documentStyle)
          : documentStyle.getPropertyValue(
              dataType.bgcolor ? dataType.bgcolor : applyColorsToColumns(dataType.bgcolor)
            ),
        data: chartValues?.map((chartValue) => {
          const barData = chartValue.find((obj) => obj.label === dataType.label)?.value
          return barData
        })
      }

      // if tension is true then, the value is set to 0.4 and added to newData property
      // tension applies only in case of Line charts and in Bar charts, it doesnt apply
      if (tension) {
        newData.tension = 0.4
      }
      chartData.push(newData)
    })
    return chartData
  }
  return []
}

export const getPieChartDatasets = (data, documentStyle) => {
  if (data) {
    /** now format the data
     *  in context of pie chart, we expect every group to have only one datasets each,
     * if there are multiple datasets then it will be a multi layered pie charts
     * labels: ["Group A", "Group B", ...] :- length of array inside data === labels count
     *
     * Metric Data Format                       Required Format for datasets
     * [                                        [
     *   {                                         {
     *                                               label: "Group A"
     *     "label": "Group A",                       data : [numeric_data, numeric_data,..],
     *     "group_by": "Group A",                    backgroundColor : ....,
     *     "values": [                               hoverBackgroundColor : ....,
     *       {                                     },
     *         "label": "Data A",                  {
     *          "value": "numeric_data"              label:"Group B"
     *                                               data : [numeric_data, numeric_data,..],
     *                                               backgroundColor : ....,
     *       }                                       hoverBackgroundColor : ....,
     *   },                                        },
     *   {                                         ..
     *     "label": "Group B",                     ..
     *     "group_by": "Group B",               ]
     *     "values": [
     *       {
     *         "label": "Data B",
     *         "value": "numeric_data"
     *       }
     *   },
     */
    const dataTypesCount = data?.length
    let chartData = []
    const pieDataValues = data
      ?.map((datum) => datum.values[0])
      ?.map((obj) => obj.value?.toFixed(2) ?? 0)
    chartData = {
      backgroundColor:
        customColors(data, documentStyle) ?? getPieChartColorSets(dataTypesCount, documentStyle),
      hoverBackgroundColor:
        customColors(data, documentStyle) ?? getPieChartColorSets(dataTypesCount, documentStyle),
      data: pieDataValues
    }
    // send as array format
    return [chartData]
  }
  return []
}
