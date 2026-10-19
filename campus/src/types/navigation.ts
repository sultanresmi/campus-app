// src/types/navigation.ts

export type RootStackParamList = {
  Login: undefined;
  Main: undefined; // Здесь подключаются нижние табы
  Details: undefined;
  NewsDetails: { announcementId: number }; // Параметр для экрана деталей
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
};
