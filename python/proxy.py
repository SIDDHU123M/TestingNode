import requests
from bs4 import BeautifulSoup
import re
import concurrent.futures
import time

# Define proxy provider URLs
PROXY_SOURCES = {
    "sslproxies": "https://www.sslproxies.org/",
    "free_proxy_list": "https://free-proxy-list.net/",
    "us_proxy": "https://www.us-proxy.org/",
    "socks_proxy": "https://www.socks-proxy.net/",
    "proxy_list_download": "https://www.proxy-list.download/HTTP",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/58.0.3029.110 Safari/537.3"
}

def fetch_proxies_sslproxies():
    url = PROXY_SOURCES["sslproxies"]
    response = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(response.text, "lxml")
    proxies = []
    table = soup.find("table", id="proxylisttable")
    if table:
        for row in table.tbody.find_all("tr"):
            cols = row.find_all("td")
            ip = cols[0].text.strip()
            port = cols[1].text.strip()
            https = cols[6].text.strip()
            if https == "yes":
                proxies.append(f"{ip}:{port}")
    return proxies

def fetch_proxies_free_proxy_list():
    url = PROXY_SOURCES["free_proxy_list"]
    response = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(response.text, "lxml")
    proxies = []
    table = soup.find("table", id="proxylisttable")
    if table:
        for row in table.tbody.find_all("tr"):
            cols = row.find_all("td")
            ip = cols[0].text.strip()
            port = cols[1].text.strip()
            https = cols[6].text.strip()
            if https == "yes":
                proxies.append(f"{ip}:{port}")
    return proxies

def fetch_proxies_us_proxy():
    url = PROXY_SOURCES["us_proxy"]
    response = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(response.text, "lxml")
    proxies = []
    table = soup.find("table", id="proxylisttable")
    if table:
        for row in table.tbody.find_all("tr"):
            cols = row.find_all("td")
            ip = cols[0].text.strip()
            port = cols[1].text.strip()
            country = cols[3].text.strip()
            https = cols[6].text.strip()
            if country.lower() == "united states" and https == "yes":
                proxies.append(f"{ip}:{port}")
    return proxies

def fetch_proxies_socks_proxy():
    url = PROXY_SOURCES["socks_proxy"]
    response = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(response.text, "lxml")
    proxies = []
    table = soup.find("table", id="proxylisttable")
    if table:
        for row in table.tbody.find_all("tr"):
            cols = row.find_all("td")
            ip = cols[0].text.strip()
            port = cols[1].text.strip()
            proxy_type = cols[4].text.strip().lower()
            if "socks4" in proxy_type or "socks5" in proxy_type:
                proxies.append(f"{ip}:{port}")
    return proxies

def fetch_proxies_proxy_list_download():
    url = PROXY_SOURCES["proxy_list_download"]
    response = requests.get(url, headers=HEADERS, timeout=10)
    soup = BeautifulSoup(response.text, "lxml")
    proxies = []
    # The proxies are listed in plain text with IP:PORT per line
    text = soup.get_text()
    lines = text.splitlines()
    for line in lines:
        if re.match(r"\d+\.\d+\.\d+\.\d+:\d+", line):
            proxies.append(line.strip())
    return proxies

def fetch_all_proxies():
    all_proxies = []
    fetch_functions = [
        fetch_proxies_sslproxies,
        fetch_proxies_free_proxy_list,
        fetch_proxies_us_proxy,
        fetch_proxies_socks_proxy,
        fetch_proxies_proxy_list_download,
    ]
    for func in fetch_functions:
        try:
            proxies = func()
            print(f"Fetched {len(proxies)} proxies from {func.__name__}")
            all_proxies.extend(proxies)
            # Respectful delay between requests
            time.sleep(2)
        except Exception as e:
            print(f"Error fetching proxies from {func.__name__}: {e}")
    # Remove duplicates
    unique_proxies = list(set(all_proxies))
    print(f"Total unique proxies fetched: {len(unique_proxies)}")
    return unique_proxies

def test_proxy(proxy, timeout=5):
    test_url = "https://httpbin.org/ip"
    proxies = {
        "http": f"http://{proxy}",
        "https": f"http://{proxy}",  # Some proxies might not support HTTPS
    }
    try:
        response = requests.get(test_url, proxies=proxies, headers=HEADERS, timeout=timeout)
        if response.status_code == 200:
            # Optionally, verify that the IP matches the proxy
            origin_ip = response.json().get("origin")
            proxy_ip = proxy.split(":")[0]
            if proxy_ip in origin_ip:
                print(f"Working Proxy: {proxy}")
                return proxy
    except Exception:
        pass
    return None

def test_proxies(proxies, max_workers=50):
    working_proxies = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_proxy = {executor.submit(test_proxy, proxy): proxy for proxy in proxies}
        for future in concurrent.futures.as_completed(future_to_proxy):
            proxy = future_to_proxy[future]
            try:
                result = future.result()
                if result:
                    working_proxies.append(result)
            except Exception as e:
                print(f"Error testing proxy {proxy}: {e}")
    print(f"Total working proxies: {len(working_proxies)}")
    return working_proxies

def save_proxies(proxies, filename="working_proxies.txt"):
    with open(filename, "w") as f:
        for proxy in proxies:
            f.write(f"{proxy}\n")
    print(f"Working proxies saved to {filename}")

def main():
    print("Fetching proxies from multiple sources...")
    proxies = fetch_all_proxies()
    
    if not proxies:
        print("No proxies fetched. Exiting.")
        return
    
    print("\nTesting proxies for functionality...")
    working_proxies = test_proxies(proxies)
    
    if working_proxies:
        save_proxies(working_proxies)
    else:
        print("No working proxies found.")

if __name__ == "__main__":
    main()
