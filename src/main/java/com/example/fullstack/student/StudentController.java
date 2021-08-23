package com.example.fullstack.student;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path= "/api/v1/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(){
        //throw new IllegalStateException("oops error");
       return studentService.getAllStudents();
    }

    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) {
        studentService.addStudent(student);
    }

    @DeleteMapping(path="{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }

    @PostMapping("/update")
    public void updateStudent(@Valid @RequestBody Student student) { studentService.updateStudent(student); }

//, produces = MediaType.APPLICATION_JSON_VALUE
    @GetMapping(value = "/{id}" )
    public Student getStudent(@PathVariable("id") Long studentId){
        return studentService.getStudent(studentId);
    }
}
