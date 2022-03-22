package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func init() {
	var err error
	username := os.Getenv("MYSQL_USER")
	password := os.Getenv("MYSQL_PASSWORD")
	datasource := fmt.Sprintf("%s:%s@tcp(db:3306)/ahall-db", username, password)
	db, err = sql.Open("mysql", datasource)
	if err != nil {
		panic(err)
	}
}

func fetchProducts(db *sql.DB) []Product {
	var products []Product
	rows, err := db.Query(`select * from products`)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		var product Product
		err := rows.Scan(
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Image,
			&product.Feature,
		)
		if err != nil {
			log.Fatal(err)
		}
		products = append(products, product)
	}
	return products
}

// Product maps to columns in the DB
type Product struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
	Image       string `json:"image"`
	Feature     bool   `json:"feature"`
}

// GetProducts reads all products from the database and marshals them as JSON
func GetProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "* ")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(fetchProducts(db))
}

func main() {
	http.HandleFunc("/products", GetProducts)
	http.ListenAndServe(":8000", nil)
}
