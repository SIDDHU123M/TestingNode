import 'dart:async';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:battery_plus/battery_plus.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final Battery _battery = Battery();
  final FlutterLocalNotificationsPlugin _flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  
  int _batteryLevel = 0;
  String _temperature = "N/A";
  String _notification = "No new notifications";

  @override
  void initState() {
    super.initState();
    _initNotifications();
    _updateBatteryLevel();
    _sendDataToServer();
  }

  Future<void> _initNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid = AndroidInitializationSettings('@mipmap/ic_launcher');
    final InitializationSettings initializationSettings = InitializationSettings(android: initializationSettingsAndroid);
    await _flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  Future<void> _updateBatteryLevel() async {
    final level = await _battery.batteryLevel;
    setState(() {
      _batteryLevel = level;
    });
  }

  Future<void> _sendDataToServer() async {
    // Replace with your Node.js server URL
    String serverUrl = "http://your-node-server-ip:3000/update";

    final response = await http.post(
      Uri.parse(serverUrl),
      body: {
        'batteryLevel': _batteryLevel.toString(),
        'temperature': _temperature,
        'notification': _notification,
      },
    );

    if (response.statusCode == 200) {
      print("Data sent successfully!");
    } else {
      print("Failed to send data.");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Phone Data Monitor")),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text("Battery Level: $_batteryLevel%"),
              Text("Temperature: $_temperature"),
              Text("Notification: $_notification"),
              ElevatedButton(
                onPressed: _sendDataToServer,
                child: Text("Send Data to Server"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
