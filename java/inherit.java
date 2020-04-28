class A{
    protected int i=2;
}

class B extends A{
    int sum,j;
    public void add() {
        sum=i+j;
    }
}

class Run{
    public static void main(String args[]) {
        B ob = new B();
        ob.add();
        System.out.println(ob.sum);
    }
}