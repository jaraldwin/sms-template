<template>
  <q-page class="q-pa-lg">
    <div>
      <q-input
        style="max-width: 550px"
        filled
        v-model="text"
        :dense="dense"
        label="Search for student, teacher documents etc."
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div>
      <h4 class="q-mb-md">Dashboard</h4>
      <div class="row justify-between">
        <q-card class="my-card text-black">
          <q-item>
            <q-item-section>
              <q-img src="~assets/reading-book.png" style="width: 70%"></q-img>
            </q-item-section>
            <q-item-section>
              <div class="text-h6 text-weight-light">Students</div>
              <div class="text-h4 text-weight-bold">302</div>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card text-black">
          <q-item>
            <q-item-section>
              <q-img src="~assets/teacher.png" style="width: 70%"></q-img>
            </q-item-section>
            <q-item-section>
              <div class="text-h6 text-weight-light">Teachers</div>
              <div class="text-h4 text-weight-bold">33</div>
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="my-card text-black">
          <q-item>
            <q-item-section>
              <q-img src="~assets/steward.png" style="width: 70%"></q-img>
            </q-item-section>
            <q-item-section>
              <div class="text-h6 text-weight-light">Staffs</div>
              <div class="text-h4 text-weight-bold">28</div>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <div class="q-mt-xl row justify-between">
        <q-card class="text-black" style="width: 100%; max-width: 640px">
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6 text-weight-bold">Attendance Overview</div>
              <div style="width: 100%; max-width: 110px">
                <q-select
                  filled
                  v-model="studentModel"
                  :options="studentOption"
                  label="Student"
                  dense
                />
              </div>
            </div>

            <div>
              <apexchart
                type="line"
                :options="options"
                :series="series"
              ></apexchart>
            </div>
            <div></div>
          </q-card-section>
        </q-card>
        <q-card class="text-black" style="width: 100%; max-width: 380px">
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6 text-weight-bold">Productivity</div>
              <q-btn style="padding: 0 !important" class="ellipsis"
                ><q-icon name="more_vert"
              /></q-btn>
            </div>
            <div>
              <apexchart
                height="350"
                type="bar"
                :options="chartOptions"
                :series="seriesBar"
              ></apexchart>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  name: "DashboardPage",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const studentModel = ref(null);
    const studentOption = ref(["Option 1", "Option 2", "Option 3", "Option 4"]);
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxisBar: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      seriesBar: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
      studentModel,
      studentOption,
      text: ref(""),
      dense: ref(false),
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["February", "March", "April", "May", "June"],
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
        },
      },
      series: [
        {
          name: "series-1",
          data: [10, 40, 20, 70, 30],
        },
      ],
    };
  },
});
</script>

<style>
.my-card {
  width: 100%;
  max-width: 330px;
}
</style>
