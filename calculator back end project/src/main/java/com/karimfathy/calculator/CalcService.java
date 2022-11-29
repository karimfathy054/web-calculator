package com.karimfathy.calculator;


@org.springframework.stereotype.Service
public class CalcService {
    public String twoOperands(double first , String operation , double second){
        double result =0.0;
        if(operation.equalsIgnoreCase("add")){
            result =first + second;
        }
        else if(operation.equalsIgnoreCase("minus")){
            result =first - second;
        }
        else if(operation.equalsIgnoreCase("divide")){
            if((second>0) || (second<0)){
                result =first / second;
            }
            else{
                System.out.println("server returned "+String.valueOf('E')+" for /0");
                return String.valueOf('E');
            }
        }
        else if(operation.equalsIgnoreCase("multiply")){
            result =first * second;
        }
        return String.valueOf(result);
    }

    public String oneOperand (String operation ,double operand){
        double result =0.0;
        if(operation.equalsIgnoreCase("root")){
            result = Math.sqrt(operand);
        }
        else if(operation.equalsIgnoreCase("square")){
            result= operand*operand;
        }
        else if(operation.equalsIgnoreCase("inverse")){
            if((operand>0) || (operand<0)){
                result= 1/operand;
            }else{
                System.out.println("back end return E for 1/x");
                return "E";
            }

        }
        else if(operation.equalsIgnoreCase("percent")){
            result= operand/100;
        }
        return String.valueOf(result);
    }
}
