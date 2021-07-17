import Field from '../interfaces/Field';
import arrayUnique from './ArrayUnique';

const fieldMatchesSearchQuery = (field: Field, searchQuery: string) => {
  if (!searchQuery) {
    return true;
  }
  let searchParams: string[] = searchQuery.split(' ');
  if (searchParams.length <= 0) {
    return true;
  }
  const labels = (field.label || '').split(' ');
  let search_tags = field.search_tags || [];
  let concatenated = search_tags.concat(labels).map((val: string) => val.toLowerCase());
  search_tags = arrayUnique(concatenated);
  return (
    searchParams.filter(param => {
      for (let i = 0; i < search_tags.length; i++) {
        if (search_tags[i].includes(param)) {
          return true;
        }
      }
      return false;
    }).length > 0
  );
};

export default fieldMatchesSearchQuery;
