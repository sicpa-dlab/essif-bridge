FROM bcgovimages/von-image:py36-1.15-1

RUN pip3 install git+https://github.com/hyperledger/aries-cloudagent-python@main

RUN pip3 install git+https://github.com/sicpa-dlab/acapy-resolver-universal.git

ENTRYPOINT ["/bin/bash", "-c", "aca-py \"$@\"", "--"]