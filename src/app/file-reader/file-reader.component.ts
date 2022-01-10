import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-reader',
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.css']
})
export class FileReaderComponent {
  fileOutput;
  result = new Array();
  ersteZeile;
  onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {

      this.fileOutput = e.target.result;

      let zeilen = this.fileOutput.split("\n");
      let zeilenanzahl = zeilen.length;       // Ausgabe der Zeilenlänge der eingelesenen Datei

      // String wird gesplittete und startet nun beim ersten @ Zeichen
      let i =0;
      for(let zeile of zeilen){
        i++;
        //console.log("zeilennummer:", i)
        //console.log("Sucherergebnis search:",zeile.search("@PostMapping") )
        if(zeile.search("@ApiOperation") !== -1){
          zeile = zeile.substring(zeile.search("@ApiOperation"));         // substring: gibt Teilstring des Strings nach dem @ zurüc
          let splitted = zeile.split("\"");                               //Zeilen werden beim ersten " gesplittete
          splitted = splitted[1] + "\"";                                  // Speichern der gesplitteten Wörter an 1 Stelle
          console.log(splitted);                                          // Ausgabe der gesplitteten Wörter
          this.result.push(splitted);                                     // push: fügt die aktuelle Zeile zum Array hinten an
          // Stefan fragen wie man Anführungszeichen löscht
          /*this.result.forEach(element,index)=>{
            if(element=="\"") delete this.result[index];
          }));*/
        }else if (zeile.search("@GetMapping")>-1 || zeile.search("@PatchMapping")>-1 || zeile.search("@PostMapping")>-1 || zeile.search("@PutMapping")>-1 || zeile.search("@DeleteMapping")>1) {
        this.result.push(zeile)
        }else{
         console.log("Annotation entspricht nicht Fall 1-5");
         //Leerzeile hinzufügen
        }
      }

      //console.log(this.result);
    };

    reader.readAsText(file);

  }
  headers = ["@-Zeilen"];                                 //Tabellen-Überschrift
  rows = this.result;                                     // Ausgabe der gefilterten Zeilen

}
//1.Fall:
//2: Fall: result.find(@ApiOperation);
//
