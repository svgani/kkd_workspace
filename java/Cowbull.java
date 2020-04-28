import java.util.Scanner;

public class Cowbull{
    public static void main(String args[]){
        System.out.println("Hello");
        // take number of digits input
        int nd = digits();
        System.out.println("nd is "+nd);
        //generate random number
        int a = random(nd);
        //Take user input
        String b = input(nd);
        System.out.println(b);
    }
            
    static String input(int n){
        
        String str = "1234";
//        if(str[0]=="0"){
//            
//        } else {
//            
//        }
        return str;
    }
    
    static int digits(){
        System.out.println("Enter the number in the range 1 - 10");
        Scanner i = new Scanner();
        int i;
        if (i<1||i>10){
            digits();
        }

            return i;
        
    }
    
    static int random(int n){
        double num = Math.random();
        num = num*Math.pow(10, n);
        System.out.println(num);
        int x = (int) num;
        System.out.println(x);
        
        return x;
    }
}


//okta login
