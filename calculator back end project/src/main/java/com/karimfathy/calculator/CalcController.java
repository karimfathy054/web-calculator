package com.karimfathy.calculator;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
public class CalcController {
    private final CalcService calculator ;

    @Autowired
    public CalcController(CalcService calculator) {
        this.calculator = calculator;
    }

    @GetMapping("sent")
    public String serverresponded() {
        String response ="server sent response";
        System.out.println("server sent response");
        return response;
    }

    @GetMapping("{first}/{operation}/{second}")
    public ResponseEntity<String> twoOperands (@PathVariable double first,@PathVariable String operation ,@PathVariable double second){
        String answer = calculator.twoOperands(first, operation, second);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }

    @GetMapping("{operation}/{operand}")
    public ResponseEntity<String> oneOperand (@PathVariable String operation ,@PathVariable double operand){
        String answer = calculator.oneOperand(operation, operand);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }


}
