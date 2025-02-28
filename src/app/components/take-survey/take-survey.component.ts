import { Component, OnInit } from '@angular/core';



import { SurveyService } from 'src/app/services/survey.service';
import { Question } from 'src/app/models/question';
import { Survey} from 'src/app/models/survey';
import { Choice} from 'src/app/models/choice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  surveys: Array<Survey>=[]
  choices: Array<Choice>=[]
  surveyName : string;
  count: number;
  question: string;
  showMessage : boolean = false;
  value=true;

  

  constructor(private surveyService : SurveyService, private router: Router, private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.surveyService.fetchAllSurveys()
  //   .subscribe((res:Array<Survey>)=> {
  //     console.log(res);
  //     this.surveys = res;
      
  //   })
    
  // }

  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      
      console.log('***', params.get('name'));
      this.surveyName = params.get("name");
      console.log(this.surveyName);
    })
    this.surveyService.fetchAllOptions(this.surveyName).subscribe((res: any) => {
      
      this.question = res.question;
      this.choices = res.choices;
      })

}

calculate(choice: Choice){
if(this.value===true)
{
 
console.log("In calculate "+choice.count++);
  this.updateEmployee(choice) ;
  this.value=false;
}

}


updateEmployee(choice:Choice){
  // console.log(this.myForm.controls['name'])
  // console.log(name, salary);
  console.log("In update "+choice.count);
  
  this.surveyService.update(choice)
  .subscribe(res=>{
    console.log(res)
    if(res.status == 202){
      this.showMessage = true;
    }
  });
}
viewresult()
{
  console.log("in result :");
  this.router.navigate(['result',{name:this.choices[0].surveyName}]);
  }



}
