package main

import (
	"fmt"
)

// var email string = "Kitcharoen_s2@silpakorn.edu"

func main() {
	// var name string = "Sasithon"
	var age int = 20

	email := "Kitcharoen_s2@silpakorn.edu"
	gpa := 3.00

	firstname, lastname := "Sasithon", "Kitcharoen"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)
}
