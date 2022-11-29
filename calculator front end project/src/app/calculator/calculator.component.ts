import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { CalcServiceService } from '../calc-service.service';
@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {



  private calcservice: CalcServiceService;
  secondoperation =false;
  equalisClicked= false;

  constructor(calcservice: CalcServiceService){
    this.calcservice = calcservice;
  }
  
  operand1= "";
  operand2= "";
  operator= "";
  unaryOP= "";
  expression= "";
  current= "";
  currentisResult= false;
  operand1true= false;
  operatorClicked= false;
  
  clear(){
    this.operand1= "";
    this.operand2= "";
    this.operator= "";
    this.unaryOP= "";
    this.expression= "";
    this.current= "";
    this.currentisResult= false;
    this.operand1true= false;
    this.operatorClicked= false;
  }
  backspace(){
    this.current=this.current.slice(0,-1);
  }
  inverse(){
    this.unaryOP = "inverse";
  }
  square(){
    this.unaryOP= "square";
  }
  sqRoot(){
    this.unaryOP= "root";
  }
  percent(){
    this.unaryOP="percent";
  }
  operate(){
    if (this.current != ""){
      //get answer from server
      this.calcservice.getAnswerOneOperand(this.unaryOP,this.current).subscribe(
        (response: String)=>{
          this.current = response.valueOf();
          this.currentisResult =true;
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )      
    }
  }
  dot(){
    this.current= this.current.indexOf(".")== -1 ? this.current+"." :this.current;
  }

  sign(){
    this.current= this.current.charAt(0)=="-" ? this.current.slice(1) : "-"+this.current; 
  }
  append(number: string){
    if(this.currentisResult || this.equalisClicked){
      this.current="";
      this.currentisResult=false;
      if(this.equalisClicked){
        this.expression= "";
        this.equalisClicked= false;
      }
      if(this.operand1=="E"){
        this.clear();
      }
      
    }
    this.current=this.current+number;
  }
  divide(){
    if(!this.operand1true && !this.operatorClicked && this.expression==""){
      this.operand1=this.current;
      this.operator= "divide";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"/";
      this.current="";

    }else if(this.operand1true && this.operatorClicked && this.current!=""){
      this.secondoperation=true;
      this.equal();
      this.operator= "divide";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"/";
      this.current="";
    }
  }
  multiply(){
    if(!this.operand1true && !this.operatorClicked && this.expression==""){
      this.operand1=this.current;
      this.operator= "multiply";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"*";
      this.current="";

    }else if(this.operand1true && this.operatorClicked && this.current!=""){
      this.secondoperation=true;
      this.equal();
      this.operator= "multiply";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"*";
      this.current="";
    }
  }
  minus(){
    if(!this.operand1true && !this.operatorClicked && this.expression==""){
      this.operand1=this.current;
      this.operator= "minus";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"-";
      this.current="";

    }else if(this.operand1true && this.operatorClicked && this.current!=""){
      this.secondoperation=true;
      this.equal();
      this.operator= "minus";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"-";
      this.current="";
    }
  }
  add(){
    if(!this.operand1true && !this.operatorClicked && this.expression==""){
      this.operand1=this.current;
      this.operator= "add";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"+";
      this.current="";

    }else if(this.operand1true && this.operatorClicked && this.current!=""){
      this.secondoperation=true;
      this.equal();
      this.operator= "add";
      this.operand1true=true;
      this.operatorClicked=true;
      this.expression=this.expression+this.operand1+"+";
      this.current="";
    }
  }
  
  qualify(){
    if (this.current != ""){
      //get answer from server
      this.calcservice.getAnswerTwoOperand(this.operand1,this.operator,this.operand2).subscribe(
        (response: any)=>{
          console.log(response);
          this.current = response;
          this.currentisResult=true;
          if(this.secondoperation){
            this.operand1= response;
            this.secondoperation =false;
          }
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
    }
  }
  equal(){
    if(this.operand1true && this.operatorClicked && this.current!=""){
      this.operand2=this.current;
      this.expression= this.expression+this.operand2;
      this.qualify();
      this.currentisResult=true;
      this.operand1= "";
      this.operand2= "";
      this.operator= "";
      this.unaryOP= "";
      this.operand1true=false;
      this.operatorClicked=false;
    }
  }
  equalisclicked(){
    this.equalisClicked=true;
  }
}
