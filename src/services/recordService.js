import * as db from "../data/inMemoryDB.js";

export const createRecord = (params) => {
  const records = db.getRecords();
  const item = {
    id: records.length ? records[records.length - 1].id + 1 : 1,
    amount: parseFloat(params.amount),
    type: params.type.toLowerCase(),
    category: params.category,
    date: params.date,
    notes: params.notes || "",
  };

  return db.saveRecord(item);
};

export const getFilteredRecords = (filters) => {
  let data = db.getRecords();

  if (filters.type) {
    data = data.filter((r) => r.type === filters.type.toLowerCase());
  }

  if (filters.category) {
    data = data.filter(
      (r) => r.category.toLowerCase() === filters.category.toLowerCase(),
    );
  }

  return data;
};

export const updateRecord = (id, params) => {
  const data = {};
  if (params.amount !== undefined) data.amount = parseFloat(params.amount);
  if (params.type !== undefined) data.type = params.type.toLowerCase();
  if (params.category !== undefined) data.category = params.category;
  if (params.date !== undefined) data.date = params.date;
  if (params.notes !== undefined) data.notes = params.notes;

  return db.updateRecordInDb(id, data);
};

export const deleteRecord = (id) => {
  return db.deleteRecordFromDb(id);
};

export const getSummary = () => {
  const records = db.getRecords();
  
  // Single pass through data for multiple results
  const stats = records.reduce((acc, r) => {
    // Totals
    if (r.type === 'income') acc.income += r.amount;
    else acc.expense += r.amount;

    // Categories
    acc.cats[r.category] = (acc.cats[r.category] || 0) + r.amount;

    // Trends 
    const mo = r.date.slice(0, 7);
    if (!acc.trends[mo]) acc.trends[mo] = { in: 0, out: 0 };
    acc.trends[mo][r.type === 'income' ? 'in' : 'out'] += r.amount;

    return acc;
  }, { income: 0, expense: 0, cats: {}, trends: {} });

  return {
    totals: {
      income: stats.income,
      expense: stats.expense,
      net: stats.income - stats.expense
    },
    categories: stats.cats,
    monthly: stats.trends,
    latest: [...records].sort((a,b) => b.id - a.id).slice(0, 5)
  };
};