package com.example.fullstack.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        // check if email is taken
        Boolean existsEmail = studentRepository
                .selectExistsEmail(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException(
                    "Student with id " + studentId + " does not exists");
        }
        studentRepository.deleteById(studentId);
    }

    public Student getStudent(Long id){
        // check if student exists
        if(!studentRepository.findById(id).isPresent()){
            throw new StudentNotFoundException(
                    "Student with id " + id + " does not exists");
        }
        return studentRepository.findById(id).get();
    }

    public void updateStudent(Student student) {
        // check if student exists
        if(!studentRepository.existsById(student.getId())) {
            throw new StudentNotFoundException(
                    "Student with id " + student.getId() + " does not exists");
        }
        if (studentRepository.selectExistsEmail(student.getEmail())) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " taken");
        }
        studentRepository.save(student);
    }
}
