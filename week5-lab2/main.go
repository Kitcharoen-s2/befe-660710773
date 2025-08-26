package main

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID   string `jsun:"id"`
	Name string `json:"name"`
}

func getUsers(c *gin.Context) {
	user := []User{{ID: "1", Name: "Sasithon"}}
	c.JSON(200, user)
}

func main() {
	r := gin.Default()

	r.GET("/users", getUsers)

	r.Run(":8080")

}
