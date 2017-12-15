class Square {
  constructor(used) {
    this.used = used;
    this.grouped = false;
  }

  group(i, j, arr, match) {
    if (!this.grouped && this.used === match) {
      this.grouped = true;
      if (i > 0) {
        arr[i-1][j].group(i-1, j, arr, match);
      }
      if (i < 127) {
        arr[i+1][j].group(i+1, j, arr, match);
      }
      if (j > 0) {
        arr[i][j-1].group(i, j-1, arr, match);
      }
      if (j < 127) {
        arr[i][j+1].group(i, j+1, arr, match);
      }
      return;
    }
  }
}
