# Alarm Clock

Alarm Clock is an npm module to play a random video or sound (from a list of links in a file) at the time set by the user.

## Requirements

Node 13.0.0 and above

## Installation

Clone this repository and run the following command to install the module.

```bash
npm install -g
```

## Usage

Basic Usage:-
```bash
alarmclock --hour <hour (in military format)> --minute [minute] --file <path to file with list of links>
```
The minute argument defaults to 00, while the hour and file arguments are required.

For help:-
```bash
alarmclock --help
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.