export type IconKey =
  | "drop"
  | "sparkle"
  | "shield"
  | "spray"
  | "wrench"
  | "wind"
  | "tire"
  | "car"
  | "sedan"
  | "suv"
  | "van"
  | "engine"
  | "seat"
  | "headlight"
  | "wax";

export type VehicleClass = {
  id: string;
  name: string;
  short: string;
  description: string;
  icon: IconKey;
};

export type ClassPrice = {
  classId: string;
  amount: number;
  minutes: number;
};

export type PriceService = {
  id: string;
  name: string;
  description?: string;
  icon: IconKey;
  isFrom?: boolean;
  prices: ClassPrice[];
};

export type PriceCategory = {
  id: string;
  slug: string;
  name: string;
  icon: IconKey;
  cover: string;
  services: PriceService[];
};

export const vehicleClasses: VehicleClass[] = [
  {
    id: "c1",
    name: "Класс 1",
    short: "Седан",
    description: "Седаны, хэтчбеки, купе. Polo, Solaris, Rio",
    icon: "sedan",
  },
  {
    id: "c2",
    name: "Класс 2",
    short: "Средний",
    description: "Средний класс, универсалы. Camry, Octavia, Tiguan",
    icon: "car",
  },
  {
    id: "c3",
    name: "Класс 3",
    short: "SUV",
    description: "Внедорожники, минивэны. Prado, X5, Carnival",
    icon: "suv",
  },
  {
    id: "c4",
    name: "Класс 4",
    short: "Коммерция",
    description: "Микроавтобусы, пикапы. Transit, Sprinter, УАЗ",
    icon: "van",
  },
];

function row(
  amounts: [number, number, number, number],
  minutes: [number, number, number, number],
): ClassPrice[] {
  return vehicleClasses.map((cls, i) => ({
    classId: cls.id,
    amount: amounts[i],
    minutes: minutes[i],
  }));
}

const same = (n: number): [number, number, number, number] => [n, n, n, n];

export const priceCategories: PriceCategory[] = [
  {
    id: "extra",
    slug: "dop",
    name: "Дополнительные услуги",
    icon: "spray",
    cover: "/media/poster-wheels.jpg",
    services: [
      {
        id: "e1",
        name: "Удаление дорожного налета (обезжиривание кузова)",
        icon: "spray",
        prices: row([500, 500, 500, 600], same(30)),
      },
      {
        id: "e2",
        name: "Удаление битума (1 элемент)",
        icon: "wrench",
        prices: row(same(1000), same(20)),
      },
      {
        id: "e3",
        name: "Удаление металлических вкраплений (1 элемент)",
        icon: "wrench",
        prices: row(same(500), same(20)),
      },
      {
        id: "e4",
        name: "Удаление металлических вкраплений (весь автомобиль)",
        icon: "wrench",
        prices: row([2000, 2100, 2300, 2800], same(90)),
      },
      {
        id: "e6",
        name: "Чистка 1 диска специальной химией",
        icon: "tire",
        prices: row(same(350), same(15)),
      },
      {
        id: "e7",
        name: "Чернение резины (Россия)",
        icon: "tire",
        prices: row(same(300), same(10)),
      },
      {
        id: "e8",
        name: "Чернение резины с подготовкой покрышки (Германия)",
        icon: "tire",
        prices: row(same(450), same(15)),
      },
      {
        id: "e9",
        name: "Nano-антидождь с удалением водного камня",
        icon: "drop",
        prices: row([2500, 2500, 2500, 3000], same(45)),
      },
      {
        id: "e10",
        name: "Обработка силиконом резиновых уплотнителей",
        icon: "spray",
        prices: row(same(200), same(10)),
      },
      {
        id: "e11",
        name: "Уборка салона пылесосом",
        icon: "wind",
        prices: row([500, 500, 600, 700], same(20)),
      },
      {
        id: "e12",
        name: "Уборка пластика",
        icon: "sparkle",
        prices: row([400, 400, 450, 600], same(20)),
      },
      {
        id: "e13",
        name: "Чистка стекол",
        icon: "sparkle",
        prices: row([400, 400, 450, 600], same(15)),
      },
      {
        id: "e14",
        name: "Уборка багажного отделения",
        icon: "wind",
        prices: row([400, 500, 600, 400], same(20)),
      },
      {
        id: "e15",
        name: "Кварцевое покрытие Mizu (Япония)",
        icon: "shield",
        prices: row([1500, 2000, 2300, 2500], same(60)),
      },
      {
        id: "e16",
        name: "Твердый воск Soft99 (Япония)",
        icon: "wax",
        prices: row([3500, 4000, 4500, 5000], same(90)),
      },
      {
        id: "e17",
        name: "Твердый воск Gyeon (Корея)",
        icon: "wax",
        prices: row([5000, 5500, 6000, 6500], same(90)),
      },
    ],
  },
  {
    id: "polish",
    slug: "polirovka",
    name: "Профессиональная полировка",
    icon: "sparkle",
    cover: "/media/poster-polish.jpg",
    services: [
      {
        id: "p1",
        name: "Восстановительная полировка с керамикой + Lux салона",
        description: "ServFaces, Германия.",
        icon: "sparkle",
        prices: row([29000, 33000, 36000, 39000], same(480)),
      },
      {
        id: "p2",
        name: "Глянцевая полировка с нанесением твердого воска",
        icon: "wax",
        prices: row([15000, 17000, 19000, 21000], same(240)),
      },
      {
        id: "p3",
        name: "Глянцевая полировка",
        icon: "sparkle",
        prices: row([12000, 14000, 16000, 18000], same(180)),
      },
      {
        id: "p4",
        name: "Глянцевая полировка с керамическим покрытием",
        description: "ServFaces, Германия.",
        icon: "shield",
        prices: row([20000, 22000, 24000, 26000], same(300)),
      },
      {
        id: "p5",
        name: "Профессиональная полировка фар (за 1 фару)",
        icon: "headlight",
        prices: row(same(1000), same(30)),
      },
      {
        id: "p6",
        name: "Полировка элемента",
        icon: "sparkle",
        prices: row(same(2000), same(60)),
      },
      {
        id: "p7",
        name: "Восстановительная полировка 1 элемента",
        icon: "sparkle",
        prices: row(same(2000), same(90)),
      },
      {
        id: "p8",
        name: "Коррекция 1 элемента с нанесением керамики",
        icon: "shield",
        prices: row(same(4000), same(120)),
      },
      {
        id: "p9",
        name: "Нанесение гидрофобного покрытия на основе керамики",
        icon: "shield",
        prices: row([6000, 7000, 8000, 9000], same(120)),
      },
      {
        id: "p10",
        name: "Коррекция керамического покрытия всего автомобиля",
        icon: "shield",
        prices: row([15000, 17000, 19000, 21000], same(360)),
      },
    ],
  },
  {
    id: "clean",
    slug: "himchistka",
    name: "Профессиональная химчистка",
    icon: "wind",
    cover: "/media/poster-interior.jpg",
    services: [
      {
        id: "c1",
        name: "Химчистка всего автомобиля + озонация салона",
        icon: "wind",
        prices: row([12000, 14000, 16000, 18000], same(360)),
      },
      {
        id: "c2",
        name: "Полная химчистка пола",
        icon: "wind",
        prices: row(same(2250), same(90)),
      },
      {
        id: "c3",
        name: "Полная химчистка сидений",
        icon: "seat",
        prices: row(same(4100), same(120)),
      },
      {
        id: "c4",
        name: "Химчистка потолка",
        icon: "wind",
        prices: row([1600, 1650, 1750, 2000], same(60)),
      },
      {
        id: "c5",
        name: "Химчистка одного сиденья (ткань/кожа)",
        icon: "seat",
        prices: row(same(1000), same(45)),
      },
      {
        id: "c6",
        name: "Кондиционер для кожи весь салон (Россия)",
        icon: "seat",
        prices: row(same(2000), same(60)),
      },
      {
        id: "c7",
        name: "Премиальный кондиционер для кожи, одно сиденье (LeTech, Англия)",
        icon: "seat",
        prices: row(same(1000), same(30)),
      },
      {
        id: "c8",
        name: "Химчистка пола (1 место)",
        icon: "wind",
        prices: row(same(500), same(20)),
      },
      {
        id: "c9",
        name: "Удаление соляных пятен",
        icon: "spray",
        prices: row(same(1000), same(30)),
      },
      {
        id: "c10",
        name: "Химчистка багажного отделения",
        icon: "wind",
        prices: row(same(1000), same(45)),
      },
      {
        id: "c11",
        name: "Химчистка обивки двери",
        icon: "wind",
        prices: row(same(500), same(20)),
      },
      {
        id: "c12",
        name: "Химчистка руля",
        icon: "car",
        prices: row(same(600), same(20)),
      },
      {
        id: "c13",
        name: "Химчистка руля с премиальным защитным кремом",
        icon: "car",
        prices: row(same(1000), same(30)),
      },
      {
        id: "c14",
        name: "Озонация салона",
        description: "Удаление неприятных запахов.",
        icon: "wind",
        prices: row(same(2500), same(60)),
      },
    ],
  },
];

export function minPrice(service: PriceService): number {
  return Math.min(...service.prices.map((p) => p.amount));
}

export function priceForClass(service: PriceService, classId: string): ClassPrice {
  return service.prices.find((p) => p.classId === classId) ?? service.prices[0];
}

export function featuredHomePrices() {
  const ids = ["p3", "p4", "p1", "c1", "e15", "e16", "p2", "e9"];
  const found: { category: PriceCategory; service: PriceService }[] = [];
  for (const id of ids) {
    for (const category of priceCategories) {
      const service = category.services.find((s) => s.id === id);
      if (service) found.push({ category, service });
    }
  }
  return found;
}
