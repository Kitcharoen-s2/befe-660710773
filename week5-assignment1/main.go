package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Reservation struct สำหรับข้อมูลการจองห้องประชุม
type Reservation struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Room_id   string `json:"room_id"`
	Date      string `json:"date"`
	TimeStart string `json:"time_start"`
	TimeEnd   string `json:"time_end"`
	Purpose   string `json:"purpose"`
}

// In-memory database (ในโปรเจคจริงใช้ database)
var reservations = []Reservation{
	{ID: "1", Name: "John Doe", Room_id: "101", Date: "2025-09-10", TimeStart: "13:00", TimeEnd: "15:00", Purpose: "ติวคณิตศาสตร์"},
	{ID: "2", Name: "Jane Smith", Room_id: "103", Date: "2025-09-12", TimeStart: "10:00", TimeEnd: "12:00", Purpose: "ประชุมงานกลุ่ม"},
}

func getReservations(c *gin.Context) {
	dateQuery := c.Query("date")
	if dateQuery != "" {
		filter := []Reservation{}
		for _, r := range reservations {
			if r.Date == dateQuery {
				filter = append(filter, r)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, reservations)
}

func main() {
	r := gin.Default()

	r.GET("/reservation_status", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "จองห้องประชุมสำเร็จ"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/reservations", getReservations)
	}
	r.Run(":8080")
}
