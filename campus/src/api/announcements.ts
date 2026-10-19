// src/api/announcements.ts
import { Announcement } from '../types/announcement';

// Статические данные в формате JSON, полностью повторяющие структуру JSONPlaceholder
const mockAnnouncements: Announcement[] = [
  {
    userId: 1,
    id: 1,
    title: "Көктемгі семестр басталады",
    body: "Оқу кестесі және маңызды ақпаратпен танысыңыз. Барлық студенттердің сабаққа қатысуы міндетті."
  },
  {
    userId: 1,
    id: 2,
    title: "Стипендиялық бағдарламалар ашылды",
    body: "Өтінім қабылдау басталды. Мүмкіндікті жіберіп алмаңыз және құжаттарды уақытылы тапсырыңыз."
  },
  {
    userId: 1,
    id: 3,
    title: "Студенттік форум – 2025",
    body: "Идеялар, тәжірибе және жаңа таныстықтар. Форум бас ғимараттың мәжіліс залында өтеді."
  },
  {
    userId: 1,
    id: 4,
    title: "Кампус инфрақұрылымы жаңарады",
    body: "Жаңа оқу кеңістіктері мен демалыс аймақтары ашылады. Студенттер үйінде жөндеу жұмыстары аяқталды."
  },
  {
    userId: 1,
    id: 5,
    title: "Халықаралық тағылымдама",
    body: "Сыртқы академиялық ұтқырлық бағдарламасы бойынша конкурстық іріктеу басталғанын хабарлаймыз."
  },
  {
    userId: 1,
    id: 6,
    title: "Ғылыми жобалар байқауы",
    body: "Университет ішілік жас ғалымдар мен студенттердің үздік инновациялық идеяларына гранттар беріледі."
  }
];

// Имитация асинхронного GET-запроса списка новостей с задержкой в 1.5 секунды
export async function getAnnouncements(): Promise<Announcement[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnnouncements);
    }, 1500); // 1.5 секунды будет крутиться лоадер
  });
}

// Имитация асинхронного GET-запроса одной конкретной новости по ID
export async function getAnnouncement(id: number): Promise<Announcement> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = mockAnnouncements.find(item => item.id === id);
      if (found) {
        resolve(found);
      } else {
        reject(new Error('Хабарландыру табылмады'));
      }
    }, 800); // Экран деталей загрузится чуть быстрее
  });
}
