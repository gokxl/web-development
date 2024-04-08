# main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

app = FastAPI()

# Configure CORS settings to allow requests from any origin with any headers and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FormData(BaseModel):
    name: str
    activity: str
    timing: str

@app.post("/saveFormData")
async def save_form_data(form_data: FormData):
    try:
        with open('formData.json', 'a') as file:
            json.dump(form_data.dict(), file)
            file.write('\n')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving form data: {e}")
    return {"message": "Form data saved successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
