import React from "react";
import EnhancedTable from "../../../Main/Table/enhancedTable";
import { HeadCell } from "../../../../utils";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import CustomChart from "../../Charts/index";
interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const Index: React.FC = () => {
  const headCells: HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Product name",
      isShowInHead: true,
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "Calories",
      isShowInHead: true,
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Fat (g)",
      isShowInHead: true,
    },
    {
      id: "carbs",
      numeric: true,
      disablePadding: false,
      label: "Carbs (g)",
      isShowInHead: true,
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Protein (g)",
      isShowInHead: true,
    },
  ];

  const rows = [
    createData(1, "name", 12, 34, 234, 214),
    createData(2, "name2", 12, 34, 234, 214),
    createData(3, "name3", 12, 34, 234, 214),
    createData(4, "name4", 12, 34, 234, 214),
    createData(5, "name5", 12, 34, 234, 214),
    createData(6, "name6", 12, 34, 234, 214),
  ];
  const rows2 = [
    createData(10, "name", 12, 34, 234, 214),
    createData(20, "name2", 12, 34, 234, 214),
    createData(30, "name3", 12, 34, 234, 214),
    createData(40, "name4", 12, 34, 234, 214),
    createData(50, "name5", 12, 34, 234, 214),
    createData(60, "name6", 12, 34, 234, 214),
  ];

  const toDoHeadCells: HeadCell[] = [
    {
      id: "Description",
      numeric: false,
      disablePadding: false,
      label: "Description",
      isShowInHead: true,
    },
    {
      id: "Color",
      numeric: false,
      disablePadding: false,
      label: "Color",
      isShowInHead: false,
    },
  ];

  const toDoRows = [
    {
      id: 1,
      Description: "Create FireStone Logo",
      Color: "success",
    },
    {
      id: 2,
      Description: "Create FireStone Logo2",
      Color: "primary",
    },
    {
      id: 3,
      Description: "Create FireStone Logo",
      Color: "warning",
    },
    {
      id: 4,
      Description: "Create FireStone Logo2",
      Color: "success",
    },

    {
      id: 5,
      Description: "Create FireStone Logo",
      Color: "danger",
    },
    {
      id: 6,
      Description: "Create FireStone Logo2",
      Color: "warning",
    },
    {
      id: 7,
      Description: "Create FireStone Logo",
      Color: "danger",
    },
    {
      id: 8,
      Description: "Create FireStone Logo2",
      Color: "success",
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    title: {
      text: "AMR Consumption",
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },

    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  var series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  var coptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  var roptions: ApexOptions = {
    chart: {
      height: 350,
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      radar: {
        size: 80,
        polygons: {
          strokeColors: "#e9e9e9",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },

    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      // strokeColor: "#FF4560",
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        // formatter: function (val) {
        //   return val;
        // },
      },
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        // formatter: function (val, i) {
        //   if (i % 2 === 0) {
        //     return val;
        //   } else {
        //     return "";
        //   }
        // },
      },
    },
  };

  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2} className=" p-5 ">
        <Grid item xs={12} sm={6} md={4}>
          <Box className="bg-danger border-radius" height={200}></Box>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Box className="bg-primary border-radius" height={200}></Box>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Box className="bg-success border-radius" height={200}></Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomChart
            options={roptions}
            series={[
              {
                name: "Series 1",
                data: [20, 100, 40, 30, 50, 80, 33],
              },
            ]}
            type={"radar"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomChart
            options={coptions}
            series={[44, 55, 41, 17, 15]}
            type={"donut"}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <CustomChart options={options} series={series} type={"area"} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            alignItems={"center"}
            flexDirection={"column"}
            className="bg-white h-100 p-0 border-radius"
            sx={{
              display: "flex",
            }}
          >
            <EnhancedTable
              hasCheckBox={true}
              hasPagination={false}
              headCells={toDoHeadCells}
              rows={toDoRows}
              tableTitle="Todo"
              hasFilter={false}
              hasTableHeader={false}
              rowsPerPageProps={toDoRows?.length}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <EnhancedTable
            hasCheckBox={true}
            headCells={headCells}
            rows={rows}
            tableTitle="Product"
            hasFilter={true}
            hasPagination={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <EnhancedTable
            hasCheckBox={false}
            headCells={headCells}
            rows={rows2}
            tableTitle="New Products"
            hasFilter={false}
            hasPagination={true}
          />
        </Grid>
      </Grid>{" "}
    </>
  );
};
export default Index;
