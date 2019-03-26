import { Component, ViewChild, Output, EventEmitter, Input } from "@angular/core";

@Component({
  templateUrl: "elastic-textarea.html",
  selector: "elastic-textarea",
  inputs: ["placeholder", "lineHeight"],

  queries: {
    ionTxtArea: new ViewChild("ionTxtArea")
  }
})
export class ElasticTextareaComponent {
  @Output() textchanged = new EventEmitter<any>();
  @Input() isClear: boolean = false;
  content = "";
  lineHeight;
  txtArea;
  ionTxtArea;
  maxHeight;

  constructor() {
    // this.content = "";
    this.lineHeight = "22px";
    this.maxHeight = 220;
  }

  ngAfterViewInit() {
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
  }

  ngOnChanges() {
    if (this.isClear) {
      this.clearInput();
    }
  }

  onChange(newValue) {
    this.txtArea.style.height = this.lineHeight + "px";
    if (this.txtArea.scrollHeight <= this.maxHeight) {

      this.txtArea.style.height = this.txtArea.scrollHeight + "px";
    } else {
      this.txtArea.style.height = 220 + "px";
    }
    this.textchanged.emit(this.content);
  }

  clearInput() {
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
    this.isClear = false;
  }
}
