export default function makeTree(categories) {
  for (let i = categories.length - 1; i >= 0; i -= 1) {
    const item = categories[i];
    if (item.parent) {
      const parent = findDeepById(item.parent, categories);
       if (!parent.children) {
         parent.children = [];
       }
       parent.children.push(item);
       categories.splice(i, 1);
    }
  }
  
  function findDeepById(id, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return items[i];
      } else if (Array.isArray(items[i].children)) {
        let found = findDeepById(id, items[i].children);
        if (found) {
          return found;
        }
      }
    }
  }

  return categories;
}