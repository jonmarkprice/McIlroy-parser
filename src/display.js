const { functions, syntax } = require('./syntax');

// type Token = string | any[] |
// if object, then displayable

/**
 * @param {any} obj
 * @return {string}
 */
function display(obj) {
  if (syntax.has(obj) || functions.has(obj)) {
    return obj; // Don't quote application operator.
  }
  else if (Array.isArray(obj)) {
    // If list is empty
    if (obj.length === 0) {
      return '[]';
    }
    // For singleton lists
    else if (obj.length === 1) {
      return '[' + display(obj[0]) + ']';
    }
    // For lists of length two or greater
    else {
      const lastIndex = obj.length - 1;
      return obj.reduce((agg, elem, index) => {
        if (agg === '') {
          // For first item
          return '[' + display(elem);
        }
        else if (index === lastIndex) {
          // For last item
          return agg + ', ' + display(elem) + ']';
        }
        else {
          return agg + ', ' + display(elem);
        }
      }, '');
    }
  }
  else if (typeof obj === 'object') {
    console.log("==== DISPLAYING OBJECT ====");
    console.log(obj);
  
    if (obj.display !== undefined) {
      console.log('HAS DISPLAY')
      return obj.display;
    }
    else {
      // for aliases (TODO: rename 'name' -> 'display')
      console.log('DOES NOT HAVE DISPLAY');
      console.log(`displaying: ${obj.name}`);
      return obj.name;
    }
  }
  else if (typeof obj === 'string' && obj.length === 1) {
    return `'${obj}'`; // Quote characters
  }
  else {
    return obj.toString();
  }
}

module.exports = display
