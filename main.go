package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
)

type Counter struct {
	mu    sync.Mutex
	Value int
}

var globalCounter = Counter{
	Value: 0,
}

func main() {
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/", fs)

	mux.HandleFunc("POST /api/increment", incrementCount)

	fmt.Println("Server starting at http://localhost:4000")

	if err := http.ListenAndServe(":4000", mux); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func incrementCount(w http.ResponseWriter, r *http.Request) {
	globalCounter.mu.Lock()
	globalCounter.Value++
	current := globalCounter.Value
	globalCounter.mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{"value": current})
}