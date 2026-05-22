#!/usr/bin/env python3
"""
IIT Rankings Crawler - Simple All Branches Approach
Round -> Institute Type -> All -> All -> Open
"""

import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

class IITCrawler:
    def __init__(self):
        self.url = "https://josaa.admissions.nic.in/applicant/SeatAllotmentResult/CurrentORCR.aspx"
        self.driver = None
        self.data = []
        
    def setup_driver(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(10)
        
    def select_by_value(self, dropdown_id, value):
        """Select by value using JavaScript"""
        try:
            # Use JavaScript to set value and trigger change event
            script = f"""
            const select = document.getElementById('{dropdown_id}');
            select.value = '{value}';
            select.dispatchEvent(new Event('change', {{ bubbles: true }}));
            """
            self.driver.execute_script(script)
            time.sleep(0.5)
            return True
        except Exception as e:
            print(f"    select_by_value({dropdown_id}, {value}) failed: {e}")
            return False
    
    def submit_and_extract(self):
        """Submit form and extract table"""
        try:
            btn = self.driver.find_element(By.XPATH, "//input[@type='submit']")
            btn.click()
            time.sleep(1)
            
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            tables = soup.find_all('table')
            
            if not tables:
                return [], []
            
            table = tables[-1]
            rows = table.find_all('tr')
            
            if len(rows) < 2:
                return [], []
            
            headers = [c.text.strip() for c in rows[0].find_all(['th','td'])]
            data = []
            
            for row in rows[1:]:
                cells = [c.text.strip() for c in row.find_all('td')]
                if any(cells):
                    data.append(cells)
            
            return headers, data
        except Exception as e:
            print(f"  Error submitting: {e}")
            return [], []
    
    def crawl(self):
        try:
            self.setup_driver()
            self.driver.get(self.url)
            print("Loading page...")
            time.sleep(5)
            
            # Fixed selections using exact values
            rounds = ["1", "2", "3", "4", "5", "6"]
            print(f"Processing {len(rounds)} rounds\n")
            
            # Process each round
            for r_idx, round_val in enumerate(rounds):
                print(f"[{r_idx+1}/{len(rounds)}] Round: {round_val}")
                
                try:
                    # Select round
                    if not self.select_by_value("ctl00_ContentPlaceHolder1_ddlroundno", round_val):
                        print(f"  Failed to select round")
                        continue
                    
                    # Select institute type (IIT)
                    if not self.select_by_value("ctl00_ContentPlaceHolder1_ddlInstype", "IIT"):
                        print(f"  Failed to select IIT")
                        continue
                    
                    time.sleep(0.5)
                    
                    # Select All institutes
                    if not self.select_by_value("ctl00_ContentPlaceHolder1_ddlInstitute", "ALL"):
                        print(f"  Failed to select all institutes")
                        continue
                    
                    time.sleep(0.5)
                    
                    # Select All programs
                    if not self.select_by_value("ctl00_ContentPlaceHolder1_ddlBranch", "ALL"):
                        print(f"  Failed to select all programs")
                        continue
                    
                    time.sleep(0.3)
                    
                    # Select Open category
                    if not self.select_by_value("ctl00_ContentPlaceHolder1_ddlSeattype", "OPNO"):
                        print(f"  Failed to select open category")
                        continue
                    
                    time.sleep(0.2)
                    
                    # Submit and extract
                    headers, rows = self.submit_and_extract()
                    
                    if rows:
                        for row in rows:
                            entry = {
                                'Round': round_val,
                                'InstituteType': 'Indian Institute of Technology',
                                'Category': 'Open'
                            }
                            for i, h in enumerate(headers):
                                if i < len(row):
                                    entry[h] = row[i]
                            self.data.append(entry)
                        print(f"  ✓ Extracted {len(rows)} records")
                    else:
                        print(f"  ✗ No data found")
                        
                except Exception as e:
                    print(f"  Error processing round {round_val}: {e}")
            
            # Save results
            self.save()
            
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()
        finally:
            if self.driver:
                self.driver.quit()
    
    def save(self):
        if not self.data:
            print("\nNo data extracted!")
            return
        
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        csv_f = f"iit_rankings_{ts}.csv"
        df = pd.DataFrame(self.data)
        df.to_csv(csv_f, index=False, encoding='utf-8')
        
        json_f = f"iit_rankings_{ts}.json"
        with open(json_f, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2)
        
        print(f"\n{'='*60}")
        print(f"✓ Saved: {csv_f}")
        print(f"✓ Saved: {json_f}")
        print(f"Total records: {len(self.data)}")
        print('='*60)


if __name__ == "__main__":
    print("="*60)
    print("IIT Rankings Crawler - All Branches")
    print("="*60 + "\n")
    crawler = IITCrawler()
    crawler.crawl()
