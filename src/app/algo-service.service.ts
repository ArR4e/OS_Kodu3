import {Injectable} from '@angular/core';
import {Result} from "./result";

@Injectable({providedIn: 'root'})
export class AlgoService {
  public getTable(pattern: string): Result {
    let steps: string[][];
    steps = [Array(48).fill('-')];
    for (const [i, step] of pattern.split(';').entries()) {
      if (i > 0) {
        steps.push([...steps[i - 1]]);
      }
      let [file, snd] = step.split(',');
      if (snd === '-') {
        steps[i] = steps[i].map(cell => cell == file ? '-' : cell);
        continue;
      }
      let capacity = Number(snd.substring(Number(snd[0] === '+')));
      for (const [j, cell] of steps[i].entries()) {
        if (cell == '-') {
          steps[i][j] = file;
          capacity--;
        }
        if (!capacity) {
          break;
        }
      }
      if (capacity) {
        steps.pop();
        steps.push([]);
        break
      }
    }

    let cells = steps.at(-1);
    if (!cells?.length) {
      cells = steps!.at(-2);
    }
    if (!cells?.length) {
      console.log("Error!");
      return {steps: [[]], fragFiles: 1.1, fragMem: 1.1};
    }

    let files = new Set();
    let fragmentedFiles = new Set();
    let prevCell = cells[0];
    for (const cell of cells) {
      if (prevCell !== cell) {
        if (files.has(prevCell)) {
          fragmentedFiles.add(cell);
        } else {
          files.add(prevCell);
        }
        prevCell = cell;
      }
    }
    files.delete('-');
    fragmentedFiles.delete('-');
    let fragFiles = fragmentedFiles.size / files.size;
    let occupiedMem = cells.filter(cell => cell != '-').length;
    let occupiedFrag = cells.filter(cell => fragmentedFiles.has(cell)).length;
    let fragMem = occupiedFrag / occupiedMem;
    return {steps, fragFiles, fragMem};
  }
}
