const http = require("http");
const https = require("https");

// Configuration
const serverUrl = "https://openapi.chrislee.dev/v1/chat/completions";
const authHeader = "Basic ="; // Replace with your token

const processChunk = (chunk) => {
  // Split the chunk into lines and process each one
  const lines = chunk.split("\n");
  lines.forEach((line) => {
    if (line.trim() === "data: [DONE]") {
      console.log("\nStreaming complete.");
      return; // Skip processing for the [DONE] signal
    } else if (line.trim().startsWith("data:")) {
      const dataStr = line.slice(5).trim(); // Remove 'data:' prefix
      if (dataStr) {
        try {
          const data = JSON.parse(dataStr); // Parse the JSON
          const content = data.choices[0]?.delta?.content;
          if (content) {
            process.stdout.write(content); // Print content directly
          }
        } catch (err) {
          console.error("Failed to parse chunk:", err);
        }
      }
    }
  });
};

// Function to send a request and stream the response
function askServer(prompt) {
  const postData = JSON.stringify({
    model: "llama3.2", // Replace with your model name
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  const isHttps = serverUrl.startsWith("https");
  const lib = isHttps ? https : http; // Select the correct module

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  };

  const req = lib.request(serverUrl, options, (res) => {
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      processChunk(chunk);
    });
    res.on("end", () => {
      console.log("Response stream ended.");
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Send the request
  req.write(postData);
  req.end();
}

// Example usage
askServer("Hello, how are you?");
