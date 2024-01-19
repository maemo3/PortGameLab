for (let a = 1; a <= 5; a++) {
    let pattern = '';
    if(a!=1) {
      for (let b = 1; b <= 5 - a; b++) {
        pattern += ' ';
      }
      for (let c = 1; c <= a; c++) {
        pattern += '*';
      }
    } else {
      pattern += '*\n';
    }
    console.log(pattern);
  }