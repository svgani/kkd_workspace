class Student{
	void display(){
		System.out.println("student");
	}
}

class Teacher extends Student{
	void display(){
		System.out.println("teacher");
	}
}

class Test{
	public static void main(String args[]){
		Student T = new Teacher();
		T.display();
	}
}
