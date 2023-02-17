# coding=UTF-8

import requests
import time
import re
from os.path import exists
import sys


def get_response(url):
    #headers = get_ua()
    r = try_request_get(url)
    r.encoding = 'utf-8'
    response = r.text
    return response

def try_request_get(url):
    if (url is None):
        return None
    for retry in range(0, 10):
        try:
            content = check_response(url)
            # time.sleep(random.randrange(0,2))
            time.sleep(0.5)
            return content
        except requests.exceptions.ConnectionError:
            time.sleep(3)
            print(f"invalid, {retry+1} tried")
            continue
    print(f'{url} failed')
    return None

def check_response(url):
	req = requests.get(url)
	if req.ok:
		return req
	else:
		return None

def patch_download(start_ma, end_ma, increcment):
	i = start_ma
	while(1):
		url = 'https://gws.gplates.org/reconstruct/coastlines/?time={i}'.format(i = i)
		with open(f'{i}ma.geojson', 'w') as f:
			f.write(get_response(url))
		time.sleep(1)
		i = i + increcment
		if i > end_ma:
			break

def download_spike(points, time):
	# https://gws.gplates.org/reconstruct/reconstruct_points/?points=91.715,25.2622&time=145&model=SETON2012
	url = "https://gws.gplates.org/reconstruct/reconstruct_points/?points={points}&time={time}&model=SETON2012".format(points = points, time = time)
	# print(url)
	# sys.exit()
	file_name = f'{time}ma_spikes.geojson'
	if not exists(file_name):
		with open(file_name, 'w') as f:
			f.write(get_response(url))
	else:
		with open(file_name, 'r') as f:
			existing_line = f.readline()

		with open(file_name, 'w') as f:
			palaeo_points = get_response(url)
			# print(palaeo_points)
			coor = re.sub(r'\s', '', palaeo_points)
			coor = re.findall(r"(?<=\[)\S*(?=\])", coor)
			# print(coor[0])
			# {"type":"MultiPoint","coordinates":[[65.65,-51.97]]}
			complete = re.sub(r"]}", ","+coor[0]+"]}", existing_line)
			print(complete)
			f.write(complete)

def patch_points(start_time, end_time):
	points = ["5.443722,44.46944","11.91802,45.91419","91.715,25.2622","-3.7,52.03","-8.9042,40.1992","6.3153,43.9606","17.1348,39.0385","-104.7892,31.9091","3.3573,43.5555","8.6486,36.1537","119.7064,31.0819","118.4897,28.8539","13.792,49.855","-112.9915,39.5117","138.6334,-31.3314","67.3056,39.2","32.5311,25.5","3.0403,43.4613","12.5024,58.3589","109.5257,28.3895","-4.3541,31.2374","-104.8768,31.8767","109.9647,28.72","111.4197,30.9841","-42.32,75.1","-2.5647,52.6156","118.614933,28.815967","11.5306,47.4839","-96.0746,34.4305","10.471,45.8193","109.3211,23.6953","-2.7772,52.3592","-2.7772,52.3592","-3.014336,43.379575","-1.1133,43.6795","119.7058,31.0798","-6.8125,33.9369","6.4716,50.1496","-1.8333,41.1708","109.45,24.4333","110.374,30.8605","8.8364,44.6589","13.6011,43.5328","-57.9653,49.6829","-114.7778,36.7333","57.8914,50.2458","-55.831,47.0762","13.4933,37.2889","-0.4975,54.4069","13.2806,37.3917","14.3726,50.0147","14.3249,50.0277","14.2035,37.1469","5.3114,44.4964","12.4677,43.6466","-42.32,75.1","56.5287,53.9247","2.1968,42.8668","-2.2594,43.3006","14.3361,35.9139","-3.27,55.44","-3.2364,51.1909","-3.79,51.97","-2.2594,43.3006","13.5694,43.5867","-104.7275,38.2822","5.5119,44.3925","3.0868,43.5032","13.3255,55.7137","11.9303,46.5269","-2.6389,52.5811","-104.8328,31.8658","108.4138,26.7474","-9.3853,39.3708"]
	for time in range(start_time, end_time):
		for point in points:
			download_spike(point, time)

def patch_point_total(start_time, end_time):
    joined_points = "5.443722,44.46944,11.91802,45.91419,91.715,25.2622,-3.7,52.03,-8.9042,40.1992,6.3153,43.9606,17.1348,39.0385,-104.7892,31.9091,3.3573,43.5555,8.6486,36.1537,119.7064,31.0819,118.4897,28.8539,13.792,49.855,-112.9915,39.5117,138.6334,-31.3314,67.3056,39.2,32.5311,25.5,3.0403,43.4613,12.5024,58.3589,109.5257,28.3895,-4.3541,31.2374,-104.8768,31.8767,109.9647,28.72,111.4197,30.9841,-42.32,75.1,-2.5647,52.6156,118.614933,28.815967,11.5306,47.4839,-96.0746,34.4305,10.471,45.8193,109.3211,23.6953,-2.7772,52.3592,-2.7772,52.3592,-3.014336,43.379575,-1.1133,43.6795,119.7058,31.0798,-6.8125,33.9369,6.4716,50.1496,-1.8333,41.1708,109.45,24.4333,110.374,30.8605,8.8364,44.6589,13.6011,43.5328,-57.9653,49.6829,-114.7778,36.7333,57.8914,50.2458,-55.831,47.0762,13.4933,37.2889,-0.4975,54.4069,13.2806,37.3917,14.3726,50.0147,14.3249,50.0277,14.2035,37.1469,5.3114,44.4964,12.4677,43.6466,-42.32,75.1,56.5287,53.9247,2.1968,42.8668,-2.2594,43.3006,14.3361,35.9139,-3.27,55.44,-3.2364,51.1909,-3.79,51.97,-2.2594,43.3006,13.5694,43.5867,-104.7275,38.2822,5.5119,44.3925,3.0868,43.5032,13.3255,55.7137,11.9303,46.5269,-2.6389,52.5811,-104.8328,31.8658,108.4138,26.7474,-9.3853,39.3708"
    for time in range(start_time, end_time):
        url = "https://gws.gplates.org/reconstruct/reconstruct_points/?points={points}&time={time}&model=SETON2012".format(points = joined_points, time = time)
        file_name = f'{time}ma_spikes.geojson'
        with open(file_name, 'w') as f:
            f.write(get_response(url))
        

if __name__ == '__main__':
	# patch_download(144, 201, 1)
	# # patch_download(144, 145, 1)
	# 	with open(f'{i}ma.geojson', 'w') as f:
	# 		f.write(get_response(url))
	# 	# time.sleep(1)
	# 	i = i + increcment
	# 	if i > end_ma:
	# 		break
	
	# download_spike('91.715,25.2622', 145)
	patch_point_total(144, 201)