#!/usr/bin/env python3
"""
IIT Rankings Crawler for JOSAA
Crawls all IIT rankings for Open category across all rounds
"""

import time
import json
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

class JOSAACrawler:
    def __init__(self):
        self.url = "https://josaa.admissions.nic.in/applicant/SeatAllotmentResult/CurrentORCR.aspx"
        self.driver = None
        self.data = []
        
    def setup_driver(self):
        """Initialize Selenium WebDriver"""
        options = webdriver.ChromeOptions()
        # Uncomment below to run in headless mode
        # options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
        
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(10)
        
    def get_dropdown_options(self, dropdown_id):
        """Get all available options from a dropdown"""
        try:
            select_element = Select(self.driver.find_element(By.ID, dropdown_id))
            options = [option.get_attribute('value') for option in select_element.options if option.get_attribute('value')]
            return options
        except Exception as e:
            print(f"Error getting options for {dropdown_id}: {e}")
            return []
    
    def select_dropdown_option(self, dropdown_id, option_value):
        """Select an option from dropdown"""
        try:
            select_element = Select(self.driver.find_element(By.ID, dropdown_id))
            select_element.select_by_value(option_value)
            time.sleep(1)
            return True
        except Exception as e:
            print(f"Error selecting option {option_value} from {dropdown_id}: {e}")
            return False
    
    def click_submit_button(self):
        """Click the submit button"""
        try:
            submit_btn = self.driver.find_element(By.XPATH, "//input[@type='submit']")
            submit_btn.click()
            time.sleep(2)
            return True
        except Exception as e:
            print(f"Error clicking submit button: {e}")
            return False
    
    def extract_table_data(self):
        """Extract data from the results table"""
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, "table"))
            )
            
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            tables = soup.find_all('table')
            
            if not tables:
                print("No tables found on page")
                return []
            
            # Get the data table (usually the last or largest one)
            data_table = tables[-1] if tables else None
            if not data_table:
                return []
            
            rows = data_table.find_all('tr')
            table_data = []
            
            # Extract headers
            headers = []
            header_cells = rows[0].find_all(['th', 'td']) if rows else []
            headers = [cell.text.strip() for cell in header_cells]
            
            # Extract row data
            for row in rows[1:]:
                cells = row.find_all('td')
                if cells:
                    row_data = [cell.text.strip() for cell in cells]
                    if row_data and any(row_data):  # Skip empty rows
                        table_data.append(row_data)
            
            return headers, table_data
        except Exception as e:
            print(f"Error extracting table data: {e}")
            return [], []
    
    def crawl(self):
        """Main crawling logic"""
        try:
            self.setup_driver()
            self.driver.get(self.url)
            
            print("Page loaded, fetching dropdown options...")
            time.sleep(3)
            
            # Get available rounds
            rounds = self.get_dropdown_options("ddlRound")
            print(f"Available rounds: {rounds}")
            
            # Get available institute types
            institute_types = self.get_dropdown_options("ddlInstituteType")
            print(f"Available institute types: {institute_types}")
            
            # Process each round
            for round_val in rounds:
                print(f"\n{'='*60}")
                print(f"Processing Round: {round_val}")
                print('='*60)
                
                if not self.select_dropdown_option("ddlRound", round_val):
                    continue
                
                # Wait for dependent dropdowns to update
                time.sleep(2)
                
                # Get institutes for this round
                institutes = self.get_dropdown_options("ddlInstitute")
                print(f"Institutes in round {round_val}: {institutes}")
                
                # Process each institute
                for institute_val in institutes:
                    if not institute_val:
                        continue
                    
                    # Re-select round (as it might be reset)
                    self.select_dropdown_option("ddlRound", round_val)
                    time.sleep(1)
                    
                    if not self.select_dropdown_option("ddlInstitute", institute_val):
                        continue
                    
                    time.sleep(1)
                    
                    # Get programs for this institute
                    programs = self.get_dropdown_options("ddlProgram")
                    
                    # Process each program
                    for program_val in programs:
                        if not program_val:
                            continue
                        
                        # Re-select institute (as it might be reset)
                        self.select_dropdown_option("ddlInstitute", institute_val)
                        time.sleep(0.5)
                        
                        if not self.select_dropdown_option("ddlProgram", program_val):
                            continue
                        
                        time.sleep(0.5)
                        
                        # Select Open Category
                        if not self.select_dropdown_option("ddlCategory", "O"):  # O for Open
                            continue
                        
                        time.sleep(0.5)
                        
                        # Click submit
                        if not self.click_submit_button():
                            continue
                        
                        # Extract data
                        headers, rows = self.extract_table_data()
                        
                        if rows:
                            for row in rows:
                                entry = {
                                    'Round': round_val,
                                    'Institute': institute_val,
                                    'Program': program_val,
                                    'Category': 'Open'
                                }
                                # Add table columns
                                for i, header in enumerate(headers):
                                    if i < len(row):
                                        entry[header] = row[i]
                                self.data.append(entry)
                            
                            print(f"✓ Extracted {len(rows)} rows for {institute_val} - {program_val}")
                        else:
                            print(f"✗ No data for {institute_val} - {program_val}")
            
            self.save_data()
            print("\n" + "="*60)
            print("Crawling completed successfully!")
            print(f"Total records extracted: {len(self.data)}")
            print("="*60)
            
        except Exception as e:
            print(f"Error during crawling: {e}")
        finally:
            if self.driver:
                self.driver.quit()
    
    def save_data(self):
        """Save extracted data to CSV and JSON"""
        if not self.data:
            print("No data to save")
            return
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save as CSV
        csv_filename = f"iit_rankings_{timestamp}.csv"
        df = pd.DataFrame(self.data)
        df.to_csv(csv_filename, index=False, encoding='utf-8')
        print(f"\nData saved to: {csv_filename}")
        
        # Save as JSON
        json_filename = f"iit_rankings_{timestamp}.json"
        with open(json_filename, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)
        print(f"Data also saved to: {json_filename}")


if __name__ == "__main__":
    crawler = JOSAACrawler()
    crawler.crawl()
