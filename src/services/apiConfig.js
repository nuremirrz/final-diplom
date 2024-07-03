export const baseURL = 'https://d820-178-217-174-2.ngrok-free.app/api';

export const apiEndpoints = {
  controlPoints: '/get/control_points',
  districts: '/get/districts/1',
  transformationIndicator: '/transformation/indicator',
  tsi: '/tsi',
  tli: '/tli',
  dropDown: '/report/get/fields',
  // Добавь другие эндпойнты по аналогии
};

export const fullApiUrl = (endpoint) => `${baseURL}${endpoint}`;
// console.log(fullApiUrl(apiEndpoints.tli));

