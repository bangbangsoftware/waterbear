import { Member } from "@/waterbear3";

const comp = {
  addTime: (h: any, map: any, total: number, end = 23): number => {
    if (h > end || map[h] === undefined) {
      return total;
    }

    if (map[h].on) {
      return comp.addTime(h + 1, map, total + 1, end);
    }

    return comp.addTime(h + 1, map, total, end);
  },

  today: (date: Date, now = new Date()) => {
    const d = typeof date === "string" ? new Date(date) : date;

    if (now.getUTCDate() !== d.getUTCDate()) {
      return false;
    }
    if (now.getUTCMonth() !== d.getUTCMonth()) {
      return false;
    }
    if (now.getUTCFullYear() !== d.getUTCFullYear()) {
      return false;
    }
    return true;
  },

  hours: (user: Member, now = new Date()) => {
    const days = user.diary.filter((d: any) => {
      return comp.today(d.date, now);
    });
    const day =
      <any>days.length > 0
        ? days[0]
        : {
            off: false,
            hours: 8
          };
    if (day.off) {
      return 0;
    }
    return comp.hoursLeftToday(now, user);
  },

  hoursDoneToday: (now: Date, user: Member) => {
    const dayIndex = now.getDay();
    const dayHours = user.days[dayIndex];
    const current24Hour = now.getHours();
    const map = comp.hourMap(dayHours);
    const start = map[0].on ? 1 : 0;
    const total = comp.addTime(0, map, start, current24Hour);
    return total;
  },
  currentHours: (now: Date, user: Member) => {
    const done = comp.hoursDoneToday(now, user);
    const left = comp.hoursLeftToday(now, user);
    return {
      done,
      left
    };
  },

  hoursLeftToday: (now: Date, user: Member) => {
    const dayIndex = now.getDay();
    const dayHours = user.days[dayIndex];
    const current24Hour = now.getHours();
    const map = comp.hourMap(dayHours);
    const total = comp.addTime(current24Hour, map, 0);
    return total;
  },

  hourMap: (dayHours: any) => {
    const hours = [];
    hours.push(...dayHours.day);
    hours.push(...dayHours.night);
    const map = <any>{};
    hours.forEach(h => {
      const key = comp.mapper(h.name);
      map[key] = h;
    });
    return map;
  },

  mapper: (v: string) => {
    const posfix = v.substring(v.length - 2);
    const value = parseInt(v.substring(0, v.length - 2));
    const result = posfix === "pm" ? value + 12 : value;
    if (result > 23) {
      return 0;
    }
    return result;
  },

  hoursLeftInSprint: (
    sprint: any,
    user: Member,
    now = new Date(),
    total = 0
  ) => {
    const start = new Date(sprint.startDate);
    const dd = start.getUTCDate();
    const mm = start.getUTCMonth();
    const yy = start.getUTCFullYear();
    for (let day = 0; day < sprint.days; day++) {
      const next = new Date(yy, mm, dd + day);
      const today = comp.today(next, now);
      if (today || next.getTime() > now.getTime()) {
        const hours = comp.hours(user, next);
        total = total + hours;
      }
    }
    return total;
  }
};

export default comp;
