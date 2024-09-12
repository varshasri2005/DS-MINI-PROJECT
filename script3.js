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

    // Add a new student to the list
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

    // Display students (for debugging)
    display() {
        let current = this.head;
        const students = [];
        if (current !== null) {
            do {
                students.push(`Name: ${current.name}, Sex: ${current.sex}, Roll No: ${current.rollNo}, Email: ${current.email}, College: ${current.collegeName}, Phone: ${current.phoneNumber}`);
                current = current.next;
            } while (current !== this.head);
        }
        return students;
    }
}

// Initialize the linked list
const studentList = new StudentLinkedList();

// Handle form submission
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex').value;
    const rollNo = parseInt(document.getElementById('rollNo').value, 10);
    const email = document.getElementById('email').value;
    const collegeName = document.getElementById('collegeName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Add student to the linked list
    studentList.addStudent(name, sex, rollNo, email, collegeName, phoneNumber);

    // Show success message
    document.getElementById('studentForm').reset();
    document.getElementById('successMessage').classList.remove('hidden');

    // Optionally, log students to the console (for debugging)
    console.log(studentList.display());
});
