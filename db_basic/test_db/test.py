import sqlite3
import pandas as pd

conn = sqlite3.connect("test_database.db")

df = pd.read_sql("SELECT * FROM test_table", conn)
df.to_csv("test_table.csv", index=False)

conn.close()
