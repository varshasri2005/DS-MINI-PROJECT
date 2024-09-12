// Linked List Node
class StudentNode {
    constructor(name, sex, rollNo, email, collegeName, phoneNumber) {
        this.name = name;
        this.sex = sex;
        this.rollNo = rollNo;
        this.email = email;
        this.collegeName = collegeName;
        this.phoneNumber = phoneNumber;
        this.next = null;
    }
}

// Linked List class
class StudentLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addStudent(name, sex, rollNo, email, collegeName, phoneNumber) {
        const newStudent = new StudentNode(name, sex, rollNo, email, collegeName, phoneNumber);
        if (this.head === null) {
            this.head = newStudent;
            this.tail = newStudent;
            newStudent.next = this.head; // Circular linked list
        } else {
            this.tail.next = newStudent;
            newStudent.next = this.head;
            this.tail = newStudent;
        }
    }

    display() {
        let current = this.head;
        const students = [];
        if (current !== null) {
            do {
                students.push({
                    name: current.name,
                    sex: current.sex,
                    rollNo: current.rollNo,
                    email: current.email,
                    collegeName: current.collegeName,
                    phoneNumber: current.phoneNumber
                });
                current = current.next;
            } while (current !== this.head);
        }
        return students;
    }

    searchByRollNo(rollNo) {
        let current = this.head;
        const result = [];
        if (current !== null) {
            do {
                if (current.rollNo === rollNo) {
                    result.push({
                        name: current.name,
                        sex: current.sex,
                        rollNo: current.rollNo,
                        email: current.email,
                        collegeName: current.collegeName,
                        phoneNumber: current.phoneNumber
                    });
                }
                current = current.next;
            } while (current !== this.head);
        }
        return result;
    }

    deleteByRollNo(rollNo) {
        if (this.head === null) return;

        let current = this.head;
        let prev = null;
        let deleted = false;

        // Case: Deleting the head node
        if (this.head.rollNo === rollNo) {
            if (this.head.next === this.head) {
                this.head = null;
                this.tail = null;
                deleted = true;
            } else {
                prev = this.head;
                current = this.head.next;
                while (current.next !== this.head) {
                    current = current.next;
                }
                current.next = this.head.next;
                this.head = this.head.next;
                this.tail.next = this.head;
                deleted = true;
            }
        } else {
            prev = this.head;
            current = this.head.next;
            while (current !== this.head) {
                if (current.rollNo === rollNo) {
                    prev.next = current.next;
                    if (current === this.tail) {
                        this.tail = prev;
                    }
                    deleted = true;
                    break;
                }
                prev = current;
                current = current.next;
            }
        }
        return deleted;
    }
}

// Initialize the linked list
const studentList = new StudentLinkedList();

function fetchStudentData() {
    const students = JSON.parse(localStorage.getItem('studentList')) || [];
    students.forEach(student => {
        studentList.addStudent(student.name, student.sex, student.rollNo, student.email, student.collegeName, student.phoneNumber);
    });
    displayStudents();
}

function displayStudents() {
    const students = studentList.display();
    const studentsTableBody = document.getElementById('studentsTableBody');
    studentsTableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.sex}</td>
            <td>${student.rollNo}</td>
            <td>${student.email}</td>
            <td>${student.collegeName}</td>
            <td>${student.phoneNumber}</td>
            <td><button onclick="deleteStudent(${student.rollNo})">Delete</button></td>
        `;
        studentsTableBody.appendChild(row);
    });
}

function searchStudent() {
    const rollNo = parseInt(document.getElementById('searchRollNo').value, 10);
    const students = studentList.searchByRollNo(rollNo);
    const studentsTableBody = document.getElementById('studentsTableBody');
    studentsTableBody.innerHTML = '';

    if (students.length > 0) {
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.sex}</td>
                <td>${student.rollNo}</td>
                <td>${student.email}</td>
                <td>${student.collegeName}</td>
                <td>${student.phoneNumber}</td>
                <td><button onclick="deleteStudent(${student.rollNo})">Delete</button></td>
            `;
            studentsTableBody.appendChild(row);
        });
    } else {
        studentsTableBody.innerHTML = '<tr><td colspan="7">No student found with the provided Roll No.</td></tr>';
    }
}

function deleteStudent(rollNo) {
    const deleted = studentList.deleteByRollNo(rollNo);
    if (deleted) {
        // Update local storage
        const students = studentList.display();
        localStorage.setItem('studentList', JSON.stringify(students));
        // Refresh the display
        displayStudents();
    } else {
        alert('Student not found.');
    }
}

// Fetch and display student data on page load
fetchStudentData();
