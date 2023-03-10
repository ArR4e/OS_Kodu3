import {Component, OnInit} from '@angular/core';
import {AlgoService} from "../algo-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols!: number[]

  fstTxt = 'A,2;B,3;A,-;C,4;B,+3;D,5;E,15;C,-;F,5';
  sndTxt = 'A,2;B,3;C,4;D,5;B,-;E,7;D,-;E,+3;F,10';
  thdTxt = 'A,2;B,3;C,4;D,5;B,-;F,55';

  requestForm !: FormGroup;

  colourClasses = 'ABCDEFGHIJ';
  colourMapper!: { [key: string]: string };

  procsd = 'proc-canvas';

  fragmentationPercent!: number;
  fragmentedFiles!: number;

  customInput = '';
  steps: string[][] = [];

  ngOnInit() {
    let [_, ...rest] = [...Array(49).keys()];
    this.cols = rest;
    this.requestForm = this.formBuilder.group({
      inputChoice: ['', [
        Validators.required,
        Validators.pattern(/^\p{L},-|(\+?\p{Nd}+)(;\p{L},-|(\+?\p{Nd}+))*$/u),
      ]]
    });
  }

  constructor(
    private algo: AlgoService,
    private formBuilder: FormBuilder
  ) {
  }

  onReset(): void {
    this.steps = [];
    this.procsd = "proc-canvas hidden";
  }

  onSubmit() {
    let pattern = this.inputChoice;
    let {steps, fragFiles, fragMem} = this.algo.getTable(pattern);
    this.fragmentedFiles = fragFiles;
    this.fragmentationPercent = fragMem;
    this.steps = steps;
    this.procsd = 'proc-canvas';
    this.colourMapper =
      Object.fromEntries(
        [...new Set(pattern.split(";").map(str => str[0]))]
          .map(
          (file, idx) => [file, this.colourClasses[idx]]
        )
      );
    this.colourMapper['-'] = 'empty'
  }

  get inputChoice(): string {
    return this.requestForm.value['inputChoice'];
  }

}
