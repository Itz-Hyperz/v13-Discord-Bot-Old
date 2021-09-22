/*
This file was made by anusO1#6969
*/
#include <stdio.h>

int main() {
  char *selection;
  printf("v13 Discord Bot\n");
  printf("1. Start\n2. Install\nSelect one: ");
  scanf("%s", selection);
  switch(selection) {
    case start:
      printf("\nStarting bot...\n");
      system("node main.js");
    case install: 
      printf("\nInstalling bot...\n");
      system("npm i");
    default: 
      system("npm i");
      system("node main.js");
  }
  return 0;
}
