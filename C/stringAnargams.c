#include <string.h>
#include <stdio.h>

int main(){
	int t,count=0,i,j,sum=0;
	char a[10000],b[10000];
		scanf("%s",&a);
		scanf("%s",&b);
    printf("%3d,%3ld,%3ld,%3d\n",sum,strlen(a),strlen(b),count);
		for(i=0;i<strlen(a);i++){
			for(j=0;j<strlen(b);j++){
				if(a[i]==b[j]){
					b[j]='0';
					count++;
          break;
				}
			}
    }
	sum=strlen(a)+strlen(b)-count-count;
	printf("%3d,%3ld,%3ld,%3d\n",sum,strlen(a),strlen(b),count);
  puts(a);
  puts(b);
	print("%3d",sum);
}
