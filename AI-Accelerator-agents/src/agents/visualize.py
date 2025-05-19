import matplotlib.pyplot as plt
import seaborn as sns
import requests

def fetch_market_data(url, payload):
    """
    Fetches market data from the given URL using a POST request.
    Returns the JSON data as a dictionary if successful; otherwise, returns None.
    """
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Visualization 1: Market Size and Projected Growth (Line Chart)
def plot_market_growth(data):
    overview = data["market_analysis"]["market_overview"]
    # Convert string values to float for plotting
    size_current = float(overview["total_market_size"]["value"])
    size_projected = float(overview["total_market_size_projected"]["value"])
    year_current = overview["total_market_size"]["year"]
    year_projected = overview["total_market_size_projected"]["year"]
    
    sizes = [size_current, size_projected]
    years = [year_current, year_projected]

    plt.figure(figsize=(8, 6))
    plt.plot(years, sizes, marker='o', linestyle='-', color='b')
    plt.title("Market Size Growth (2024-2033)")
    plt.ylabel("Market Size (USD Billion)")
    plt.xlabel("Year")
    plt.grid(True)
    plt.show()

# Visualization 2: Market Segments (Pie Chart)
def plot_market_segments(data):
    segments = data["market_analysis"]["market_overview"]["market_segments"]
    labels = [seg["segment_name"] for seg in segments]
    sizes = [float(seg["segment_size"]) for seg in segments]

    plt.figure(figsize=(8, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=sns.color_palette("mako", len(sizes)))
    plt.title("Market Segments")
    plt.show()

# Visualization 3: Competitive Landscape (Horizontal Bar Chart)
def plot_competitive_landscape(data):
    competitors = data["market_analysis"]["competitive_landscape"]["market_share_distribution"]
    labels = [comp["competitor_name"] for comp in competitors]
    shares = [float(comp["market_share"]) for comp in competitors]

    plt.figure(figsize=(8, 6))
    sns.barplot(x=shares, y=labels, palette="coolwarm")
    plt.title("Competitive Landscape - Market Share Distribution")
    plt.xlabel("Market Share (%)")
    plt.ylabel("Competitor")
    plt.show()

# Visualization 4: Customer Analysis (Bar Chart)
def plot_customer_segments(data):
    segments = data["market_analysis"]["customer_analysis"]["target_customer_segments"]
    labels = [seg["segment_name"] for seg in segments]
    sizes = [float(seg["size"]) for seg in segments]

    plt.figure(figsize=(8, 6))
    sns.barplot(x=labels, y=sizes, palette="rocket")
    plt.title("Target Customer Segments")
    plt.xlabel("Segment")
    plt.ylabel("Number of Customers (Million)")
    plt.xticks(rotation=45)
    plt.show()

# Visualization 5: Regional Analysis (Bar Chart)
def plot_regional_analysis(data):
    regions = data["market_analysis"]["regional_analysis"]["regions"]
    labels = [region["region"] for region in regions]
    sizes = [float(region["market_size"]) for region in regions]

    plt.figure(figsize=(8, 6))
    sns.barplot(x=labels, y=sizes, palette="cubehelix")
    plt.title("Regional Market Sizes")
    plt.xlabel("Region")
    plt.ylabel("Market Size (USD Billion)")
    plt.xticks(rotation=45)
    plt.show()

# Main Function to Plot All
def plot_all(data):
    plot_market_growth(data)
    plot_market_segments(data)
    plot_competitive_landscape(data)
    plot_customer_segments(data)
    plot_regional_analysis(data)

if __name__ == "__main__":
    url = "http://localhost:8000/analyze-market"
    # The JSON payload to post to the endpoint
    payload = {"idea": "Mental Heatlth habit tracker that is mainly designed for stressed adults"}
    market_data = fetch_market_data(url, payload)
    print(market_data)
    if market_data:
        plot_all(market_data)
    else:
        print("No data to plot.")
