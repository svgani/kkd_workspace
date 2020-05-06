import java.util.Scanner;

public class Cowbull{
    Scanner in = new Scanner(System.in);
    int nDigit=0;
    String rand;
	String userIn;
	int chances = 0;

    public static void main(String args[]){
        Cowbull ob = new Cowbull();
//         take number of digits input
        ob.digits();
//        generate random number
        ob.random();
//        Take user input
        ob.userInput();
//        printing the no of chances
        System.out.println("--------> Chances : "+ob.chances);
    }

    private void userInput() {
    	while (true) {
    		this.chances ++;
    		System.out.println("Guess the "+this.nDigit+" digit number");
        	String a = in.next();
        	int flag=0;
        	if (a.charAt(0)=='0') {
            	System.out.println("Enter the number not starting with 0");
            	flag=1;
            }
            else if (a.length()!=this.nDigit) {
//            	System.out.println("Enter the "+this.nDigit+" digit number");
            	flag=1;
            }
            try {
            	Integer.valueOf(a);
				for (int i=0;i<this.nDigit-1;i++) {
					for (int j=i+1;j<this.nDigit;j++) {
						if (a.charAt(i)==a.charAt(j)) {
							flag=1;
					    	System.out.println("Enter the number without repetitions");
							break;
						}
					}
					if (flag==1) {
						break;
					}
				}
				if (flag==0) {
	            	this.userIn = a;
	            	System.out.println("input accepted : "+this.userIn);
	            	break;
	            }
			}
            catch (Exception e) {
            	System.out.println("Enter the numerical value");
			}
    	}
    	execute();
    }

    private void execute() {
    	int bullc=0;
    	int cowc=0;
    	for (int i=0;i<this.nDigit;i++){
        for (int j=0;j<this.nDigit;j++){
          if (i!=j){
            if (this.rand.charAt(i) == this.userIn.charAt(j)){
              cowc+=1;
            }
          }
        }
      }
      for (int i=0;i<this.nDigit;i++){
        if (this.rand.charAt(i) == this.userIn.charAt(i)){
          bullc+=1;
        }
      }
      System.out.println("CowC : "+cowc+" BullC : "+bullc);
      if (bullc == this.nDigit) {
    	  System.out.println("\n---> Number found : "+this.userIn);
      }
      else {
    	  userInput();
      }
    }

	private void digits(){
    	int i = 0;
    	String num;
    	while (true) {
    		System.out.println("Enter the number in the range 1 - 10");
    		num = in.next();
    		try {
    			i = Integer.valueOf(num);
    		}
    		catch (Exception e) {
    			System.out.println("Enter the numerical value");
    		}
    		if (i>=1 && i<=10){
                break;
            }
    	}
        System.out.println("digits "+i);
		this.nDigit = i;
    }

	private void random(){
    	String a;
    	while (true) {
    		double num = Math.random();
            num = num * Math.pow(10, this.nDigit);
//            System.out.println("double : "+num);
            int x = (int) num;
            a = Integer.toString(x);
//            System.out.println("String : "+a);
//            check repetitions
            int flag=0;
            if (a.charAt(0)=='0' || a.length()!=this.nDigit) {
            	flag=1;
            }
            else if (flag==0) {
            	for (int i=0;i<this.nDigit-1;i++) {
                	for (int j=i+1;j<this.nDigit;j++) {
                		if (a.charAt(i)==a.charAt(j)) {
                			flag=1;
                			break;
                		}
                	}
                	if (flag==1) {
                		break;
                	}
                }
            }
            if (flag==0) {
            	this.rand = a;
//            	System.out.println("Final random number : "+this.rand);
            	break;
            }
    	}
    }
}


//okta login
