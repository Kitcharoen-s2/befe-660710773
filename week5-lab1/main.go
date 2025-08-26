package main

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID   string `jsun:"id"`
	Name string `json:"name"`
}

func main() {
	r := gin.Default()

	r.GET("/users", func(c *gin.Context) {
		user := []User{{ID: "1", Name: "Sasithon"}}
		c.JSON(200, user)
	})

	r.Run(":8080")

}
