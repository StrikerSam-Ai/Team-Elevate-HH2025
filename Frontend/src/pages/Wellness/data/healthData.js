const healthData = {
  steps: {
    today: 8234,
    goal: 10000,
    weekly: [9356, 7890, 5432, 3201, 9876, 10234, 8234]
  },
  sleep: {
    last: 6.5,
    goal: 8,
    weekly: [7.2, 6.8, 7.5, 8.2, 5.5, 7.0, 6.5]
  },
  bloodPressure: {
    latest: {
      systolic: 122,
      diastolic: 78,
      date: new Date(2025, 3, 27, 8, 30)
    },
    readings: [
      {
        systolic: 122,
        diastolic: 78,
        date: new Date(2025, 3, 27, 8, 30)
      },
      {
        systolic: 125,
        diastolic: 80,
        date: new Date(2025, 3, 26, 9, 15)
      },
      {
        systolic: 118,
        diastolic: 75,
        date: new Date(2025, 3, 25, 7, 45)
      },
      {
        systolic: 130,
        diastolic: 82,
        date: new Date(2025, 3, 24, 8, 0)
      },
      {
        systolic: 128,
        diastolic: 79,
        date: new Date(2025, 3, 23, 9, 30)
      }
    ]
  },
  weight: {
    current: 165,
    goal: 160,
    history: [172, 170, 168, 167, 166, 165]
  },
  mood: {
    today: 4,
    weekly: [3, 2, 4, 3, 5, 4, 4]
  }
};

export default healthData;